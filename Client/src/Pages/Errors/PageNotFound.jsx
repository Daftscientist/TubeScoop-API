import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, Center } from '@mantine/core';
import { ReactComponent as MyLogo } from 'Static/404.svg';


const useStyles = createStyles((theme) => ({
  root: {

  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function PageNotFound() {
  const { classes } = useStyles();

  return (
    <Center>
      <Container className={classes.root}>
         <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
            <MyLogo className={classes.mobileImage}/>
            <div>
               <Title className={classes.title}>Something is not right...</Title>
               <Text color="dimmed" size="lg">
                  Page you are trying to open does not exist. You may have mistyped the address, or the
                  page has been moved to another URL. If you think this is an error contact support.
               </Text>
               <Button variant="outline" size="md" mt="xl" className={classes.control}>
                  Get back to home page
               </Button>
            </div>
            <MyLogo className={classes.desktopImage}/>
         </SimpleGrid>
      </Container>
    </Center>
  );
}

export default PageNotFound;