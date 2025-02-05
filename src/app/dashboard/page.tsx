"use server"



// Mock data for matches and players
import matchesData from "./mock.json"
import AdminDashboardClient from "./adminDashboardClient"
async function getMatchesData() {
    // Simulate a delay to mimic a network request
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return matchesData
}

export default async function AdminDashboard() {
    // Fetch data (this would normally happen server-side)
    const data = await getMatchesData()

    return <AdminDashboardClient data={data} />
}



