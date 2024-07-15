import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex grid-cols-2 gap-6">
            <Button variant="outline">
              Auhenticate With PoE
            </Button>
            <Link href="/login/github" passHref>
              <Button variant="outline">
                Github
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};