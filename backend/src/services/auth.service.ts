import prisma from "../prisma";

export async function loginService(email: string) {
  return prisma.admins.findUnique({
    where: { email },
  });
}

// export async function logoutService() {}

// export async function getMeService() {}

// export async function refreshService() {}
