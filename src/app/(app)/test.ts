"use server";

import { resetAndCreateCollections } from "@/lib/migrate-db";

export async function migrate_db_action() {
    await resetAndCreateCollections();
}