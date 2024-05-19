
'use client';
import React from 'react';
const SelectCategory =({Categories,onSelect})=>{

    return (
        <div className="relative">
          <label htmlFor="Search" className="text-sm">
            Select SubCategory
          </label>

          <select
            type="text"
            id="Search"
            placeholder="Cherchez la désignation ..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            onChange={(event) => onSelect(event.target.value)}
          >
            {Categories?.map((cat)=>(
                <option value={cat._id} key={cat._id}>{cat.nomscategorie}</option>
            ))}
          </select>
          </div>

    )
}

export default SelectCategory