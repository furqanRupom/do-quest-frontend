import { Metadata } from "next"

export const metadata:Metadata = {
    title: "Dashboard",
    description: "Dashboard page of Do.Quest",
}

const DashboardPage = () => {
    return <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to your Dashboard!</h1>
        <p className="text-lg mt-4">Here you can manage your quests, track your progress, and explore new adventures.</p>
    </section>
}
export default DashboardPage