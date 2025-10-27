'use client'
import React, { useEffect, useState } from 'react'

import {
  Select,SelectContent,SelectGroup,SelectItem,SelectLabel,
  SelectTrigger,SelectValue} from "@/components/ui/select"
import { useRouter,useSearchParams } from 'next/navigation';
import { formUrlQuery ,removeKeysFromQuery} from '@/lib/utils';
import { getAllCategories } from '@/lib/actions/category.action';
import { ICategory } from '@/lib/database/models/category.model';

const CategoryFilter = () => {
        const [categories, setCategories] = useState<ICategory[]>([])
      
      const router = useRouter();
      const searchParams = useSearchParams();
      useEffect(() => {
        const getCategories = async () => {
          const categoryList = await getAllCategories();
    
          categoryList && setCategories(categoryList as ICategory[])
        }
    
        getCategories();
      }, [])
      const onSelectCategory=(category:string)=>{
        let newUrl = '';
    
        if(category&& category!=='ALL') {
            newUrl = formUrlQuery({
              params: searchParams.toString(),
              key: 'category',
              value: category
            })
          } else {
            newUrl = removeKeysFromQuery({
              params: searchParams.toString(),
              keysToRemove: ['category']
            })
          }
          router.push(newUrl, { scroll: false });
        }
    
      
    
  return (
        <Select onValueChange={(value:string)=>onSelectCategory(value)}>
      <SelectTrigger className="w-[180px] select-field  bg-stone-50">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="All" className='select-item
          font-light text-base'>All</SelectItem>

          {categories.map((category)=>(
            <SelectItem value={category.name} key={category._id}
            className='select-item font-light text-base'>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default CategoryFilter