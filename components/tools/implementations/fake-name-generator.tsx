"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/tools/copy-button"
import { Users, RefreshCw } from "lucide-react"

const nationalities = [
  { code: "us", label: "American", firstNames: { m: ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Christopher"], f: ["Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen"] }, lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"], cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin"], states: ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "TX"], zipPrefixes: ["100", "900", "606", "770", "850", "191", "782", "921", "752", "787"] },
  { code: "uk", label: "British", firstNames: { m: ["Oliver", "George", "Harry", "Noah", "Charlie", "Jack", "Leo", "Oscar", "Henry", "Thomas"], f: ["Olivia", "Amelia", "Isla", "Ava", "Mia", "Ivy", "Lily", "Ella", "Freya", "Grace"] }, lastNames: ["Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Thomas", "Roberts"], cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Sheffield", "Liverpool", "Edinburgh", "Bristol", "Newcastle"], states: ["Greater London", "Greater Manchester", "West Midlands", "West Yorkshire", "Glasgow City", "South Yorkshire", "Merseyside", "Edinburgh", "Bristol", "Tyne and Wear"], zipPrefixes: ["SW1", "M1", "B1", "LS1", "G1", "S1", "L1", "EH1", "BS1", "NE1"] },
  { code: "in", label: "Indian", firstNames: { m: ["Aarav", "Vivaan", "Aditya", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Dhruv"], f: ["Aadhya", "Aanya", "Ananya", "Diya", "Isha", "Myra", "Navya", "Pari", "Sanya", "Siya"] }, lastNames: ["Sharma", "Verma", "Patel", "Singh", "Kumar", "Reddy", "Gupta", "Joshi", "Nair", "Menon"], cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"], states: ["Maharashtra", "Delhi", "Karnataka", "Telangana", "Tamil Nadu", "West Bengal", "Maharashtra", "Gujarat", "Rajasthan", "Uttar Pradesh"], zipPrefixes: ["400", "110", "560", "500", "600", "700", "411", "380", "302", "226"] },
]

function generateIdentity(natCode: string, gender: string) {
  const nat = nationalities.find((n) => n.code === natCode) || nationalities[0]
  const g = gender === "random" ? (Math.random() > 0.5 ? "m" : "f") : gender
  const firstName = nat.firstNames[g as keyof typeof nat.firstNames][Math.floor(Math.random() * 10)]
  const lastName = nat.lastNames[Math.floor(Math.random() * nat.lastNames.length)]
  const cityIdx = Math.floor(Math.random() * nat.cities.length)
  const streetNum = Math.floor(Math.random() * 9999) + 1
  const streetNames = ["Oak", "Elm", "Main", "Park", "Cedar", "Maple", "Pine", "Birch", "Walnut", "Cherry"]
  const street = `${streetNum} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`
  const zip = `${nat.zipPrefixes[cityIdx]}${String(Math.floor(Math.random() * 100)).padStart(2, "0")}`
  const areaCode = String(Math.floor(Math.random() * 900) + 100)
  const phone = `(${areaCode}) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99) + 1}@email.com`
  const dob = `${Math.floor(Math.random() * 50 + 18)} years`
  const occupation = ["Engineer", "Teacher", "Doctor", "Artist", "Writer", "Designer", "Developer", "Manager", "Consultant", "Analyst"][Math.floor(Math.random() * 10)]

  return { firstName, lastName, fullName: `${firstName} ${lastName}`, street, city: nat.cities[cityIdx], state: nat.states[cityIdx], zip, phone, email, dob, occupation, nationality: nat.label, gender: g === "m" ? "Male" : "Female" }
}

export default function FakeNameGenerator() {
  const [nationality, setNationality] = useState("us")
  const [gender, setGender] = useState("random")
  const [identity, setIdentity] = useState<ReturnType<typeof generateIdentity> | null>(null)

  const generate = () => {
    setIdentity(generateIdentity(nationality, gender))
  }

  const identityText = identity
    ? `Name: ${identity.fullName}\nGender: ${identity.gender}\nDOB: ${identity.dob}\nAddress: ${identity.street}, ${identity.city}, ${identity.state} ${identity.zip}\nPhone: ${identity.phone}\nEmail: ${identity.email}\nOccupation: ${identity.occupation}`
    : ""

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Nationality
              </label>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {nationalities.map((n) => (
                  <option key={n.code} value={n.code}>{n.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="random">Random</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>
          </div>
          <Button onClick={generate} className="w-full sm:w-auto">
            <Users className="size-4" />
            Generate Identity
          </Button>
          {identity && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Generated Identity
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={generate}>
                    <RefreshCw className="size-3" />
                    Regenerate
                  </Button>
                  <CopyButton text={identityText} label="Copy All" />
                </div>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-500">Full Name</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{identity.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-500">Gender</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{identity.gender}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-500">Age / DOB</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{identity.dob}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-500">Address</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50 text-right">
                      {identity.street}<br />
                      {identity.city}, {identity.state} {identity.zip}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-500">Phone</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{identity.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2">
                    <span className="text-zinc-500">Email</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{identity.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Occupation</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{identity.occupation}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
