import { LoginFormValues, SignUpFormValues } from "@/lib/schemas/auth"
import { IUser } from "@/lib/types"
import { create } from "zustand"

interface AuthStoreProps {
  user: IUser | null
  signupCredentials: SignUpFormValues | null
  loginCredentials: LoginFormValues | null
  actions: {
    setUser: (user: IUser) => void
    setLoginCredentials: (payload: LoginFormValues) => void
    setSignupCredentials: (payload: SignUpFormValues) => void
    clearCredentials: () => void
    logout: () => void
  }
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  user: null,
  signupCredentials: null,
  loginCredentials: null,
  actions: {
    setUser: (user: IUser) => {
      return set({ user })
    },
    setLoginCredentials: (payload) =>
      set({ loginCredentials: payload, signupCredentials: null }),
    setSignupCredentials: (payload) =>
      set({ signupCredentials: payload, loginCredentials: null }),
    clearCredentials: () =>
      set({ signupCredentials: null, loginCredentials: null }),
    logout: () =>
      set({ user: null, signupCredentials: null, loginCredentials: null }),
  },
}))

export const useUser = () => useAuthStore((state) => state.user)

export const useLoginCredentials = () =>
  useAuthStore((state) => state.loginCredentials)

export const useSignupCredentials = () =>
  useAuthStore((state) => state.signupCredentials)

export const useAuthActions = () => useAuthStore((state) => state.actions)
