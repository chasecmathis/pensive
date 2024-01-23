'use client'
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {noteId: number}

export default function DeleteButton({noteId}: Props) {

    const deleteNotebook = useMutation({
        mutationFn: async () => {
            const resp = await axios.post('/api/delete', {
                id: noteId
            })
            return resp.data
        }
    })

    const router = useRouter();

  return (
    <Button disabled={deleteNotebook.isPending} variant="destructive" size="icon" onClick={() => {
        const confirm = window.confirm('Are you sure you want to delete this notebook?');
        if (!confirm) return;
        else deleteNotebook.mutate(undefined, {
            onSuccess: () => router.push("/dashboard"),
            onError: (error) => console.log(error)
        })
    }}>
        <Trash  />
    </Button>
  )
}