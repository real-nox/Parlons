import { AuthContext } from '@/hooks/auth.context'
import { supabase } from '@/lib/supabase'
import { getStreak } from '@/services/essays'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<Record<string, any> | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [streak, setStreak] = useState(0)

  const refreshStreak = useCallback(async () => {
    const res = await getStreak()
    if (res.success) setStreak(res.streak)
  }, [])
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event)

      setTimeout(async () => {
        if (session) {
          setClaims({ sub: session.user.id })

          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          setProfile(data ?? null)
        } else {
          setClaims(null)
          setProfile(null)
          setStreak(0)
          setIsLoading(false)
          return
        }

        setIsLoading(false)
        refreshStreak()
      }, 0)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        claims,
        isLoading,
        profile,
        isLoggedIn: !!claims,
        setProfile,
        streak,
        refreshStreak
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}