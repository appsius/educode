'use client';

import Image from 'next/image';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import { formUrlQuery } from '@/sanity/utils';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SearhcForm = () => {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const debounceDelayFn = setTimeout(() => {
      let newUrl = '';

      if (search) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: search,
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    // For optimized rendering - performance
    return () => clearTimeout(debounceDelayFn);
  }, [search]);

  return (
    <form className='flex-center mx-auto mt-10 w-full sm:-mt-10 sm:px-5'>
      <label className='flex-center relative w-full max-w-3xl'>
        <Image
          src='/magnifying-glass.svg'
          className='absolute left-8'
          width={30}
          height={30}
          alt='Search icon'
        />
        <Input
          className='base-regular h-fit border-0 bg-black-400 py-6 pl-20 pr-8 text-white-800 !ring- !ring-offset-0
          placeholder:text-white-800'
          type='text'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </form>
  );
};

export default SearhcForm;
