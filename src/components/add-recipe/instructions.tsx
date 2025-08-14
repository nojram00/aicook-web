'use client'
import React, { useState } from "react";
import InstructionInput from "./instruction-input";
import clamp from "@/lib/clamp";

export default function Instructions() {

    const [count, setCount] = useState(2);

    const add = () => {
        setCount(prev => clamp(1, prev + 1, Number.POSITIVE_INFINITY));
    }

    const remove = () => {
        setCount(prev => clamp(1, prev - 1, Number.POSITIVE_INFINITY));
    }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Instructions *
      </label>
      <div className="space-y-3">
        { Array.from({length: count}, (_, i) => i + 1).map((value) => (
            <InstructionInput key={value} item_number={value} remove_callback={remove} />
        )) }
      </div>
      <button
        onClick={add}
        type="button"
        className="mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium"
      >
        + Add Step
      </button>
    </div>
  );
}
