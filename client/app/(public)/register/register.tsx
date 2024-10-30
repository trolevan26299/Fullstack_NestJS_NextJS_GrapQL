"use client";

import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/app/utils/common";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useLoading } from "@/app/context/loadingContext";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/app/graphql/mutations/register";

const Register = () => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useLoading();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [registerUser] = useMutation(REGISTER);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const userData = {
                email: data.email,
                password: data.password,
                username: data.username,
                phone: data.phone
            }
            await registerUser({
                variables: { userData }
            })
            setLoading(false);
            enqueueSnackbar('Register successfully!', { variant: 'success' });
            router.push('/login')
        } catch (error) {
            enqueueSnackbar('Getting error!', { variant: 'error' });
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
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        {...register('username', {
                            required: "This field is required"
                        })}
                        error={!!errors.username}
                        helperText={getErrorMessage(errors.username)}
                    />
                    <TextField
                        size="small"
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
                        size="small"
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
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        label="Phone"
                        autoFocus
                        {...register('phone', {
                            required: "This field is required",
                            pattern: {
                                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                message: "Please enter a vaild phone number"
                            }
                        })}
                        error={!!errors.phone}
                        helperText={getErrorMessage(errors.phone)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Register;