-- NexusConnect Database Schema

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    title VARCHAR(150),
    bio TEXT,
    profilePicture VARCHAR(255),
    location VARCHAR(150),
    skills VARCHAR(500),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- User Connections (Followers/Following)
CREATE TABLE connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    connectedUserId INT NOT NULL,
    status ENUM('pending', 'connected', 'blocked') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (connectedUserId) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_connection (userId, connectedUserId),
    INDEX idx_status (status)
);

-- Projects table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    ownerId INT NOT NULL,
    status ENUM('open', 'in-progress', 'completed') DEFAULT 'open',
    category VARCHAR(100),
    budget DECIMAL(10, 2),
    deadline DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_ownerId (ownerId)
);

-- Project Members (team members joining projects)
CREATE TABLE project_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projectId INT NOT NULL,
    userId INT NOT NULL,
    role VARCHAR(100) DEFAULT 'member',
    joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_member (projectId, userId),
    INDEX idx_projectId (projectId)
);

-- Documents/Files shared in projects
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projectId INT NOT NULL,
    uploadedBy INT NOT NULL,
    fileName VARCHAR(255) NOT NULL,
    filePath VARCHAR(500) NOT NULL,
    fileSize INT,
    fileType VARCHAR(50),
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (uploadedBy) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_projectId (projectId)
);

-- Messages/Notifications
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId INT NOT NULL,
    recipientId INT NOT NULL,
    content TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipientId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_recipientId (recipientId),
    INDEX idx_senderId (senderId),
    INDEX idx_isRead (isRead)
);

-- Portfolio/User Projects (showcase projects)
CREATE TABLE portfolio_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    imageUrl VARCHAR(500),
    link VARCHAR(500),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId)
);

-- Create indexes for better query performance
CREATE INDEX idx_users_createdAt ON users(createdAt);
CREATE INDEX idx_projects_createdAt ON projects(createdAt);
CREATE INDEX idx_messages_createdAt ON messages(createdAt);
CREATE INDEX idx_documents_createdAt ON documents(createdAt);
