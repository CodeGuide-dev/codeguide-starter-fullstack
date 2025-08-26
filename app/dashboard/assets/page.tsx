import { AddAssetForm } from "@/components/forms/add-asset-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function AssetsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Asset</CardTitle>
            <CardDescription>
              Track your valuable possessions and cash holdings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddAssetForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}