const formikPassword = useFormik({
    initialValues: {
        email: "",
        code: ''
    },
    onSubmit: (values) => {
        setCodeCheck(true)
        setserverError("");
        axios
            .post(`https://${constants.host}:3001/resetPassword`, { realCode: verificationCode, enteredCode: formikPassword.values.code }).catch(err => {
                toast.error(`Error:${err}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setCodeCheck(false)
            })
            .then((res) => {
                // alert(res.data)
                if (res.data.Error) {
                    toast.error(`Error:${res.data.Error}`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setCodeCheck(false)
                }
                setserverError(res.data.message);
                if (res.data.success == 1) {
                    toast.success(`Password Reset Successfully`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return navigate("/signin");
                    setCodeCheck(false)
                }
            });
    },
});
<form onSubmit={formikPassword.handleSubmit} method="post">
    <div className="mb-3">
        <label
            htmlFor="email"
            className={` ${styles.formText} form-label`}
        >
            Email address
        </label>
        <input
            type="email"
            className={`form-control ${styles.input} `}
            aria-describedby="email"
            id="email"
            name="email"
            onChange={formikPassword.handleChange}
            value={formikPassword.values.email}
        />
        {formikPassword.touched.email && formikPassword.errors.email ? (
            <div className={`${styles.formError}`}>
                {formikPassword.errors.email}
            </div>
        ) : null}
    </div>
    <div className="col-12">
        <label
            for="compnay"
            className={`form-label ${styles.inputLable_text}`}
        >
            Enter Verification Code
        </label>
        <input
            type="text"
            className="form-control"
            placeholder=""
            id="code"
            name="code"
            onChange={formikPassword.handleChange}
            value={formikPassword.values.code}
        />
        {formikPassword.touched.code && formikPassword.errors.code ? (
            <div className={`${styles.formError}`}>
                {formikPassword.errors.code}
            </div>
        ) : null}
    </div>

</form>
const SignupSchema = Yup.object().shape({

    email: Yup.string().email("Invalid email").required("Required"),
    code: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Enter password to confirm"),
});