import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-10">
        <div className="h-14" />
        <div className="flex justify-between items-center md:flex-row flex-col">
          <div className="flex items-center">
            <Link href="/">
              <Button className="bg-purple-600">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Back
              </Button>
            </Link>
            <div className="w-4" />
            <h1 className="text-3xl font-bold text-gray-900">My Notebooks</h1>
            <div className="w-4" />
            <UserButton />
          </div>
        </div>
        <div className="h-8" />
        <Separator />
        {/* List of notes */}
        <div className="text-center">
            <h2 className="text-xl text-gray-500">You have no notebooks yet!</h2>
        </div>
      </div>
    </div>
  );
}
