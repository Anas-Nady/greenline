const logout = async function () {
  try {
    const res = await fetch(`${process.env.ENDPOINT_API}/auth/logout`);

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default logout;
