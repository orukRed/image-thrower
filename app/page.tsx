"use client";
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Button>
        Click me!
      </Button>
      
      <Link href={"/view"}>
        viewへ移動するよ
      </Link>
      <Link href={"/user"}>
        viewへ移動するよ
      </Link>
      <Link href={"/register"}>
        registerへ移動するよ
      </Link>
      
    </>
  )
}
