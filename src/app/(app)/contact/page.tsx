import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    description: string;
    avatar: string;
    color: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Connor Hellman",
        role: "Frontend/Backend Developer",
        description: "Specializes in React, Next.js, and modern UI/UX design. Creates responsive and accessible user interfaces.",
        avatar: "👨‍💻",
        color: "bg-blue-500"
    },
    {
        name: "Brianna-Marie Garabato",
        role: "Database Developer",
        description: "Expert in MongoDB. Handles database management and data integration.",
        avatar: "👩‍💻",
        color: "bg-green-500"
    },
    {
        name: "Ezra Stone",
        role: "Project Manager",
        description: "Leads project planning, coordinates team efforts, and ensures timely delivery of features.",
        avatar: "👨‍💼",
        color: "bg-purple-500"
    },
    {
        name: "Shophia Kropivniskaia",
        role: "API Developer",
        description: "Expert in API development and integration. Handles API development and search Gemini API.",
        avatar: "👩‍🎨",
        color: "bg-pink-500"
    },
    {
        name: "Tuyen Tran",
        role: "Frontend/Backend Developer",
        description: "Specializes in React. Creates the frontend and backend of the app.",
        avatar: "👨‍🔧",
        color: "bg-orange-500"
    }
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-3xl font-bold text-gray-900">Contact Our Team</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Meet Our Team
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're a passionate team dedicated to creating innovative solutions.
                        Each member brings unique expertise to deliver exceptional results.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            {/* Avatar and Role Badge */}
                            <div className={`${member.color} p-6 text-center`}>
                                <div className="text-4xl mb-3">{member.avatar}</div>
                                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-white">
                                    {member.role}
                                </div>
                            </div>

                            {/* Member Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Get In Touch
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Details */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Contact Information
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-3">📧</span>
                                    <span className="text-gray-700">group19@ucf.edu</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-3">📱</span>
                                    <span className="text-gray-700">+1 (407) 823-2000</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-3">📍</span>
                                    <span className="text-gray-700">UCF Orlando, FL</span>
                                </div>
                            </div>
                        </div>

                        {/* Office Hours */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                Office Hours
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Monday - Friday</span>
                                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Saturday</span>
                                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="text-gray-900 font-medium">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 