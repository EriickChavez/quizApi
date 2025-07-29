#!/usr/bin/env npx ts-node

import { connectMongoDB } from '../src/config/db';
import { UserModel } from '../src/models/userModel';
import { USER_ROLES } from '../src/enums/roles';
import { hashPassword } from '../src/config/auth';

/**
 * Script para crear un usuario administrador inicial
 * Útil para el setup inicial del sistema
 */

const createAdminUser = async () => {
  try {
    console.log('🚀 Iniciando creación de usuario administrador...');

    // Conectar a la base de datos
    await connectMongoDB();
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe un administrador
    const existingAdmin = await UserModel.findOne({ role: USER_ROLES.ADMIN });
    
    if (existingAdmin) {
      console.log('⚠️  Ya existe un usuario administrador:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('   No es necesario crear otro administrador.');
      process.exit(0);
    }

    // Datos del administrador inicial
    const adminData = {
      name: 'Administrator',
      email: 'admin@quizapi.com',
      password: 'Admin123456!', // Cambiar esta contraseña en producción
      role: USER_ROLES.ADMIN,
      isActive: true
    };

    // Verificar que el email no existe
    const existingUser = await UserModel.findOne({ email: adminData.email });
    if (existingUser) {
      console.log(`❌ Ya existe un usuario con el email ${adminData.email}`);
      process.exit(1);
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(adminData.password);

    // Crear el usuario administrador
    const adminUser = new UserModel({
      name: adminData.name,
      email: adminData.email,
      passwordHash: hashedPassword,
      role: adminData.role,
      isActive: adminData.isActive
    });

    await adminUser.save();

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('📋 Credenciales del administrador:');
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Password: ${adminData.password}`);
    console.log(`   Role: ${adminData.role}`);
    console.log('');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    console.log('⚠️  SEGURIDAD: No uses estas credenciales en producción');

  } catch (error) {
    console.error('❌ Error creando usuario administrador:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

/**
 * Script para crear múltiples usuarios de prueba
 */
const createTestUsers = async () => {
  try {
    console.log('🚀 Iniciando creación de usuarios de prueba...');

    // Conectar a la base de datos
    await connectMongoDB();
    console.log('✅ Conectado a MongoDB');

    const testUsers = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'Admin123456!',
        role: USER_ROLES.ADMIN
      },
      {
        name: 'Moderator User',
        email: 'moderator@test.com',
        password: 'Moderator123!',
        role: USER_ROLES.MODERATOR
      },
      {
        name: 'Teacher User',
        email: 'teacher@test.com',
        password: 'Teacher123!',
        role: USER_ROLES.TEACHER
      },
      {
        name: 'Student User',
        email: 'student@test.com',
        password: 'Student123!',
        role: USER_ROLES.STUDENT
      }
    ];

    console.log(`📝 Creando ${testUsers.length} usuarios de prueba...`);

    for (const userData of testUsers) {
      // Verificar si el usuario ya existe
      const existing = await UserModel.findOne({ email: userData.email });
      if (existing) {
        console.log(`⏭️  Usuario ${userData.email} ya existe, saltando...`);
        continue;
      }

      // Hashear contraseña y crear usuario
      const hashedPassword = await hashPassword(userData.password);
      const user = new UserModel({
        name: userData.name,
        email: userData.email,
        passwordHash: hashedPassword,
        role: userData.role,
        isActive: true
      });

      await user.save();
      console.log(`✅ Creado: ${userData.role} - ${userData.email}`);
    }

    console.log('');
    console.log('🎉 Usuarios de prueba creados exitosamente!');
    console.log('📋 Credenciales de prueba:');
    testUsers.forEach(user => {
      console.log(`   ${user.role.padEnd(10)} | ${user.email.padEnd(20)} | ${user.password}`);
    });

  } catch (error) {
    console.error('❌ Error creando usuarios de prueba:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

// Ejecutar el script según los argumentos
const args = process.argv.slice(2);

if (args.includes('--test-users')) {
  createTestUsers();
} else {
  createAdminUser();
}

export { createAdminUser, createTestUsers };
