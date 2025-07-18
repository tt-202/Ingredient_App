import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth-server-utils';
import SettingsForm from '../../components/SettingsForm';

export default async function SettingsPage() {
    const session = await getServerSession();

    if (!session?.user) {
        redirect('/login');
    }

    const userSettings = {
        diet: '',
        allergies: [],
        spice_tolerance: 3,
        sweetness_preference: 3,
        saltiness_preference: 3,
        acidity_sourness_preference: 3,
        health_consciousness: 3,
        budget_tolerance: 3,
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800 tracking-tight drop-shadow-sm">Settings</h1>
                <SettingsForm initialSettings={userSettings} />
            </div>
        </div>
    );
} 