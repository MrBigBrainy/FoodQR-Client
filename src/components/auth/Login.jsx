import { useForm } from "react-hook-form";
import api from "@/api/axios";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        try {
            // const result = await api.post('https://foodqr-server.onrender.com/api/auth/login', {
            //     email: data.username,
            //     password: data.password,
            // });
            const result = await api.post('http://localhost:3000/api/auth/login', {
                email: data.username,
                password: data.password,
            });

            const token = result.data.accessToken;
            localStorage.setItem('accessToken', token);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Email"
                    {...register("username", { required: true })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                />

                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
