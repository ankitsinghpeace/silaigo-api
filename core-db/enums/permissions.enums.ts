  // src/constants/enums/permission.enums.ts

  export enum PermissionType {
    DASHBOARD = 'dashboard',
    PROFILE = 'profile', // NOT IN USE
    ORDER = 'order',
    PAYMENT = 'payment',
    USER = 'user', // NOT IN USWE
    CONTENT = 'content',
    ANALYTICS = 'analytics', // NOT IN USE
    CUSTOMERS = 'customers',
    APPOINTMENTS = 'appointments',
    INVENTORY = 'inventory',
    ROLES = 'roles',
  }

  export enum PermissionSubType {
    ALL= 'all',
    CREATE = 'create',
    EDIT = 'edit',
    DELETE = 'delete',
    VIEW = 'view',
  }
