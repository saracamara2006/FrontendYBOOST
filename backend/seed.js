import pool from './db.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    // 1. Create Schema and Tables if they don't exist
    await pool.query(`CREATE SCHEMA IF NOT EXISTS rh_core;`);
    console.log('✅ Schema rh_core checked/created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS rh_core.roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table rh_core.roles checked/created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS rh_core.permissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table rh_core.permissions checked/created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS rh_core.users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT REFERENCES rh_core.roles(id) ON DELETE SET NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table rh_core.users checked/created');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS rh_core.role_permissions (
        role_id INT REFERENCES rh_core.roles(id) ON DELETE CASCADE,
        permission_id INT REFERENCES rh_core.permissions(id) ON DELETE CASCADE,
        PRIMARY KEY (role_id, permission_id)
      );
    `);
    console.log('✅ Table rh_core.role_permissions checked/created');

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_role_id ON rh_core.users(role_id);
    `);
    console.log('✅ Index idx_users_role_id checked/created');

    // 2. Seed Roles
    const roles = [
      { name: 'Admin', description: 'System Administrator' },
      { name: 'Manager', description: 'HR Manager' },
      { name: 'Employé', description: 'Regular Employee' }
    ];

    console.log('Inserting roles...');
    for (const role of roles) {
      await pool.query(`
        INSERT INTO rh_core.roles (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING;
      `, [role.name, role.description]);
    }
    console.log('✅ Roles seeded');

    // 3. Seed Permissions
    const permissions = [
      { name: 'user:create', description: 'Create users' },
      { name: 'user:read', description: 'View users' },
      { name: 'user:update', description: 'Update users' },
      { name: 'user:delete', description: 'Delete users' },
      { name: 'document:read', description: 'View documents' }
    ];

    console.log('Inserting permissions...');
    for (const perm of permissions) {
      await pool.query(`
        INSERT INTO rh_core.permissions (name, description)
        VALUES ($1, $2)
        ON CONFLICT (name) DO NOTHING;
      `, [perm.name, perm.description]);
    }
    console.log('✅ Permissions seeded');

    // Fetch Admin role ID
    const adminRoleRes = await pool.query(`SELECT id FROM rh_core.roles WHERE name = 'Admin';`);
    const adminRoleId = adminRoleRes.rows[0].id;

    // 4. Seed Admin User
    const adminEmail = 'admin@company.com';
    const plainPassword = 'password123';
    
    // Hash password
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);

    const userCheck = await pool.query(`SELECT id FROM rh_core.users WHERE email = $1;`, [adminEmail]);

    if (userCheck.rows.length === 0) {
      await pool.query(`
        INSERT INTO rh_core.users (email, password, role_id)
        VALUES ($1, $2, $3);
      `, [adminEmail, hashedPassword, adminRoleId]);
      console.log(`👤 Seeded admin user:`);
      console.log(`   - Email: ${adminEmail}`);
      console.log(`   - Password: ${plainPassword} (stored as: ${hashedPassword.substring(0, 15)}...)`);
    } else {
      console.log('ℹ️ Admin user already exists, skipping seeding user.');
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
  }
};

seedDatabase();
