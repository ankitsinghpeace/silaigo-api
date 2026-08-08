import { PermissionType, PermissionSubType } from 'core-db/enums';

const permissionTypes = Object.values(PermissionType);
const permissionSubTypes = Object.values(PermissionSubType);

export const permissions = permissionTypes.flatMap((type) =>
  permissionSubTypes.map((subType) => ({
    type,
    subType,
    description: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${subType.charAt(0).toUpperCase() + subType.slice(1)}`,
    createdAt: new Date(),
  })),
);
