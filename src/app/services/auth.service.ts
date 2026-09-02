// services/auth.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface StoredUser extends User {
  passwordHash: string;
  salt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';
  private readonly USERS_KEY = 'users';
  private readonly SESSION_KEY = 'auth_session';
  
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    // Create the storage instance
    this._storage = await this.storage.create();
    
    // Check for existing session
    const session = await this._storage.get(this.SESSION_KEY);
    if (session) {
      const user = await this._storage.get(this.USER_KEY);
      if (user) {
        this.userSubject.next(user);
      }
    }
  }

  private async getStorage(): Promise<Storage> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    return this._storage;
  }

  // Register new user
  async register(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    const storage = await this.getStorage();
    
    // Validate input
    if (!email || !password || !firstName || !lastName) {
      throw new Error('All fields are required');
    }

    // Get existing users
    const users = await this.getUsers();
    
    // Check if user already exists
    if (users[email]) {
      throw new Error('User already exists');
    }

    // Generate salt and hash password
    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);

    // Create user object
    const user: StoredUser = {
      id: this.generateUserId(),
      email: email,
      firstName: firstName,
      lastName: lastName,
      passwordHash: passwordHash,
      salt: salt,
      createdAt: new Date().toISOString()
    };

    // Store user
    users[email] = user;
    await storage.set(this.USERS_KEY, users);
    
    // Auto-login after registration
    return this.login(email, password);
  }

  // Login user
  async login(email: string, password: string): Promise<User> {
    const storage = await this.getStorage();
    
    // Get existing users
    const users = await this.getUsers();
    const storedUser = users[email];

    if (!storedUser) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const passwordHash = await this.hashPassword(password, storedUser.salt);
    
    if (passwordHash !== storedUser.passwordHash) {
      throw new Error('Invalid credentials');
    }

    // Create user object without sensitive data
    const user: User = {
      id: storedUser.id,
      email: storedUser.email,
      firstName: storedUser.firstName,
      lastName: storedUser.lastName,
      createdAt: storedUser.createdAt
    };

    // Store session
    await storage.set(this.USER_KEY, user);
    await storage.set(this.SESSION_KEY, true);
    
    this.userSubject.next(user);
    return user;
  }

  // Logout user
  async logout(): Promise<void> {
    const storage = await this.getStorage();
    await storage.remove(this.USER_KEY);
    await storage.remove(this.SESSION_KEY);
    this.userSubject.next(null);
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const storage = await this.getStorage();
    return await storage.get(this.USER_KEY);
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const storage = await this.getStorage();
    const session = await storage.get(this.SESSION_KEY);
    return session === true;
  }

  // Update user profile
  async updateUserProfile(updates: Partial<User>): Promise<User> {
    const storage = await this.getStorage();
    const currentUser = await this.getCurrentUser();
    
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    // Get users database
    const users = await this.getUsers();
    const storedUser = users[currentUser.email];
    
    if (!storedUser) {
      throw new Error('User not found');
    }

    // Update user data
    const updatedUser = {
      ...storedUser,
      ...updates,
      email: updates.email || storedUser.email
    };

    // If email changed, handle re-indexing
    if (updates.email && updates.email !== currentUser.email) {
      // Check if new email already exists
      if (users[updates.email]) {
        throw new Error('Email already taken');
      }
      // Delete old entry
      delete users[currentUser.email];
      users[updates.email] = updatedUser;
    } else {
      users[currentUser.email] = updatedUser;
    }

    // Save users
    await storage.set(this.USERS_KEY, users);

    // Update current user
    const user: User = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      createdAt: updatedUser.createdAt
    };

    await storage.set(this.USER_KEY, user);
    this.userSubject.next(user);
    
    return user;
  }

  // Delete user account
  async deleteAccount(): Promise<void> {
    const storage = await this.getStorage();
    const currentUser = await this.getCurrentUser();
    
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    // Get users database
    const users = await this.getUsers();
    
    // Delete user
    delete users[currentUser.email];
    
    // Save users
    await storage.set(this.USERS_KEY, users);
    
    // Clear session
    await storage.remove(this.USER_KEY);
    await storage.remove(this.SESSION_KEY);
    
    this.userSubject.next(null);
  }

  // Helper: Get all users (for admin purposes)
  async getAllUsers(): Promise<Record<string, StoredUser>> {
    const storage = await this.getStorage();
    return await storage.get(this.USERS_KEY) || {};
  }

  // Helper: Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const users = await this.getUsers();
    return !!users[email];
  }

  // Private helper: Get users database
  private async getUsers(): Promise<Record<string, StoredUser>> {
    const storage = await this.getStorage();
    return await storage.get(this.USERS_KEY) || {};
  }

  // Private helper: Generate salt
  private generateSalt(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Private helper: Hash password with salt
  private async hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    const saltBytes = this.hexToBytes(salt);
    
    const combined = new Uint8Array(passwordBytes.length + saltBytes.length);
    combined.set(passwordBytes);
    combined.set(saltBytes, passwordBytes.length);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Private helper: Convert hex to bytes
  private hexToBytes(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) {
      throw new Error('Invalid hex string');
    }
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.substring(i, i + 2), 16);
      if (isNaN(byte)) {
        throw new Error('Invalid hex string');
      }
      bytes[i / 2] = byte;
    }
    return bytes;
  }

  // Private helper: Generate user ID
  private generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }
}