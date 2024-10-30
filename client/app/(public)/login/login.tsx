"use client";

import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/app/utils/common";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useLoading } from "@/app/context/loadingContext";

const Login = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const {setLoading} = useLoading();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        console.log("data form=> ", data)
        setLoading(true)
        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })

        if (res?.error) {
            console.log("err=> ", res.error)
            setLoading(false);
            enqueueSnackbar("Incorrect email or password!", { variant: 'error' })
        } else {
            router.push('/')
            setLoading(false);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        autoFocus
                        {...register('email', {
                            required: "This field is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a vaild email"
                            }
                        })}
                        error={!!errors.email}
                        helperText={getErrorMessage(errors.email)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters long"
                            }
                        })}
                        error={!!errors.password}
                        helperText={getErrorMessage(errors.password)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/register" className="text-blue-500 underline hover:text-blue-700">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;