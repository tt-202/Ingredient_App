import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth-server-utils';
import SettingsForm from '../../components/SettingsForm';
import { getUserSettings } from './actions';
import { ObjectId } from 'mongodb';

export default async function SettingsPage() {
    const session = await getServerSession();

    if (!session?.user) {
        redirect('/login');
    }

    // Use user ID or email as identifier
    const userId = session.user.id || session.user.email;
    let userSettings = await getUserSettings(userId);

    if (!userSettings) {
        userSettings = {
            _id: new ObjectId(),
            diet: '',
            allergies: [],
            spice_tolerance: 3,
            sweetness_preference: 3,
            saltiness_preference: 3,
            acidity_sourness_preference: 3,
            health_consciousness: 3,
            budget_tolerance: 3,
        };
    }
    // Remove _id and userId if present (to avoid React warnings)
    const { _id, ...rest } = userSettings as any;
    const cleanSettings: {
        _id: typeof _id;
        diet: string;
        allergies: never[];
        spice_tolerance: number;
        sweetness_preference: number;
        saltiness_preference: number;
        acidity_sourness_preference: number;
        health_consciousness: number;
        budget_tolerance: number;
    } = {
        _id,
        ...rest
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-8 rounded-lg shadow-md border border-gray-200">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 tracking-tight drop-shadow-sm">Settings</h1>
                <SettingsForm initialSettings={cleanSettings} userId={userId} />
            </div>
        </div>
    );
} 