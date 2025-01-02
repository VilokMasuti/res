"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Table = {
  id: number;
  seats: number;
  isAvailable: boolean;
};

type FloorPlanProps = {
  floor: number;
  tables: Table[];
  onTableSelect: (tableId: number) => void;
};

export function FloorPlan({ floor, tables, onTableSelect }: FloorPlanProps) {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleTableClick = (tableId: number) => {
    setSelectedTable(tableId);
    onTableSelect(tableId);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Floor {floor} Plan</h3>
      <div className="grid grid-cols-3 gap-4">
        {tables.map((table) => (
          <Button
            key={table.id}
            onClick={() => handleTableClick(table.id)}
            disabled={!table.isAvailable}
            variant={selectedTable === table.id ? "default" : "outline"}
            className={`h-20 ${
              table.isAvailable ? "bg-green-100" : "bg-red-100"
            }`}
          >
            Table {table.id}
            <br />
            {table.seats} seats
          </Button>
        ))}
      </div>
    </div>
  );
}
