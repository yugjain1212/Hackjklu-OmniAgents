"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How many customers did you lose this month?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Connect your store in 2 minutes. Find out for free.
        </p>
        
        <Link href="/auth">
          <Button
            size="lg"
            className="h-14 px-10 text-base font-semibold bg-violet-600 hover:bg-violet-700"
          >
            Find my lost customers — it&apos;s free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        
        <p className="text-sm text-gray-400 mt-4">
          No credit card · No setup call · Works in 2 minutes
        </p>
      </div>
    </section>
  );
}
