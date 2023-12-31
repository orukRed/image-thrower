"use client";
// import { Button, Grid } from '@mui/material'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Button>
        Click me!
      </Button>
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          1
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          2
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          3
        </AccordionItem>
      </Accordion>

      <Link href={"/view"}>
        viewへ移動するよ
      </Link>
      <Link href={"/user"}>
        viewへ移動するよ
      </Link>
    </>
  )
}
