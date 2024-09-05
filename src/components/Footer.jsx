import { Container, Grid, Paper, Stack, Typography } from "@mui/material"
import Image from "next/image"

const footerTexts = [
    {
        title: 'About Us',
        subTitle: ['Carrers','Our Stores','Our Cares','Terms & Conditions','Privacy Policy']
    },
    {
        title: 'Customer Care',
        subTitle: ['Help Center','Track Your Order','Corporate & Bulk Purchasing','Returns & Refunds','Privacy Policy']
    },
    {
        title: 'Contact Us',
        subTitle: ['70 Washington Square South, New York, NY 10012, United States','Email: uilib.help@gmail.com','Phone: +1 1123 456 780']
    },

]

const Footer = () => {
  return (
    <Container>
    <Grid container color="white" py={10} rowGap={5}>
        <Grid item md={3} sm={6} xs={12} pl={2}>
            <Image src='/pngwing.com.png' width={70} height={70} alt="logo"/>
            <Typography mt={2} color='gray'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
            </Typography>
        </Grid>
        {
            footerTexts.map(footerText => (
        <Grid key={footerText.title} item md={3} sm={6} xs={12} pl={2}>
            <Typography fontWeight={600} fontSize={20} mb={2}>{footerText.title}</Typography>
            <Stack color='gray' spacing={2}>
                {
                    footerText.subTitle.map(sub => (

                        <div key={sub}>{sub}</div>
                    ))
                }
            </Stack>
        </Grid>
            ))
        }
    </Grid>

    </Container>
  )
}

export default Footer