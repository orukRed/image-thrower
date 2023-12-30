import { Button, Grid } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained">Button 1</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained">Button 2</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained">Button 3</Button>
        </Grid>
      </Grid>
      <Link href={"/view"}>
        viewへ移動するよ
      </Link>
      <Link href={"/user"}>
        viewへ移動するよ
      </Link>
    </>
  )
}
