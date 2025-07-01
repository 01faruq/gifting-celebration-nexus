
import { useState, useEffect } from 'react'
import { supabase, Registry, RegistryItem, Reservation } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export const useRegistries = () => {
  const { user } = useAuth()
  const [registries, setRegistries] = useState<Registry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRegistries = async () => {
    if (!user) {
      setRegistries([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('registries')
        .select(`
          *,
          items:registry_items(
            *,
            reservations(*)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRegistries(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistries()
  }, [user])

  const createRegistry = async (registryData: {
    title: string
    event_type: string
    event_date: string
    message?: string
  }) => {
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('registries')
      .insert({
        ...registryData,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error
    await fetchRegistries()
    return data
  }

  const updateRegistry = async (id: string, updates: Partial<Registry>) => {
    const { data, error } = await supabase
      .from('registries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    await fetchRegistries()
    return data
  }

  const deleteRegistry = async (id: string) => {
    const { error } = await supabase
      .from('registries')
      .delete()
      .eq('id', id)

    if (error) throw error
    await fetchRegistries()
  }

  return {
    registries,
    loading,
    error,
    createRegistry,
    updateRegistry,
    deleteRegistry,
    refetch: fetchRegistries,
  }
}

export const useRegistry = (id: string) => {
  const [registry, setRegistry] = useState<Registry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRegistry = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('registries')
        .select(`
          *,
          profiles(*),
          items:registry_items(
            *,
            reservations(*)
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      setRegistry(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registry not found')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchRegistry()
    }
  }, [id])

  const addItem = async (itemData: {
    name: string
    description?: string
    quantity: number
    image_url?: string
  }) => {
    const { data, error } = await supabase
      .from('registry_items')
      .insert({
        ...itemData,
        registry_id: id,
      })
      .select()
      .single()

    if (error) throw error
    await fetchRegistry()
    return data
  }

  const updateItem = async (itemId: string, updates: Partial<RegistryItem>) => {
    const { data, error } = await supabase
      .from('registry_items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single()

    if (error) throw error
    await fetchRegistry()
    return data
  }

  const deleteItem = async (itemId: string) => {
    const { error } = await supabase
      .from('registry_items')
      .delete()
      .eq('id', itemId)

    if (error) throw error
    await fetchRegistry()
  }

  const reserveItem = async (itemId: string, reservationData: {
    guest_name: string
    guest_email?: string
    guest_phone?: string
    quantity_reserved: number
    message?: string
  }) => {
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        ...reservationData,
        registry_item_id: itemId,
      })
      .select()
      .single()

    if (error) throw error
    await fetchRegistry()
    return data
  }

  return {
    registry,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    reserveItem,
    refetch: fetchRegistry,
  }
}
