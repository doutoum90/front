import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useDebounce } from '../utils/useDebounce';
import { apiFetch } from '../services/api';

interface UserSettings {
    avatar: string;
    name: string;
    email: string;
    password: string;
    twoFactorAuth: boolean;
    emailNotifications: boolean;
    pushNotifications: boolean;
}
export const useUserSettings = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    const { data: initialSettings, isLoading } = useQuery<UserSettings, Error>({
        queryKey: ['userSettings'],
        queryFn: () => apiFetch('/api/user/settings'),
        staleTime: 5 * 60 * 1000,
    });
    const [settings, setSettings] = useState<UserSettings>(
        initialSettings || {
            avatar: '',
            name: '',
            email: '',
            password: '',
            twoFactorAuth: false,
            emailNotifications: false,
            pushNotifications: false,
        }
    );

    const debouncedSettings = useDebounce(settings, 300);

    useEffect(() => {
        if (initialSettings) {
            setSettings(initialSettings);
        }
    }, [initialSettings]);


    const saveSettingsMutation = useMutation({
        mutationFn: (updates: Partial<UserSettings>) =>
            apiFetch('/api/user/settings', {
                method: 'PUT',
                body: JSON.stringify(updates),
            }),
        onSuccess: (updatedSettings: UserSettings) => {
            queryClient.setQueryData(['userSettings'], updatedSettings);
            toast({ title: 'Paramètres enregistrés', status: 'success' });
        },
        onError: (err: any) =>
            toast({
                title: 'Erreur',
                description: err instanceof Error ? err.message : 'Échec de la sauvegarde',
                status: 'error',
            }),
    });

    const uploadAvatarMutation = useMutation({
        mutationFn: (file: File) => {
            const formData = new FormData();
            formData.append('avatar', file);
            return apiFetch('/api/user/avatar', {
                method: 'POST',
                body: formData,
            });
        },
        onSuccess: (response) => {
            setSettings((prev) => ({ ...prev, avatar: response.avatarUrl }));
            queryClient.setQueryData(['userSettings'], (old: UserSettings | undefined) =>
                old ? { ...old, avatar: response.avatarUrl } : old
            );
            toast({ title: 'Photo de profil mise à jour', status: 'success' });
        },
        onError: (err: any) =>
            toast({
                title: 'Erreur',
                description: err instanceof Error ? err.message : 'Échec du téléchargement',
                status: 'error',
            }),
    });
    return {
        settings: debouncedSettings,
        setSettings,
        saveSettings: saveSettingsMutation.mutate,
        uploadAvatar: uploadAvatarMutation.mutate,
        loading: isLoading || saveSettingsMutation.isPending || uploadAvatarMutation.isPending,
        error: saveSettingsMutation.error || uploadAvatarMutation.error,
    };
};