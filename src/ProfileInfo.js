import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

function ProfileInfo() {

	const defaultData = {
		"name": "John Doe",
		"email": "johndoe@somecompany.com",
	};

	const [data, setData] = useState(defaultData);

	return (
		<Typography variant="p" component="p">
			<center><font size="20"><b>{data.name}</b></font></center>
			<br /><br />
			<center>{data.email}</center>
			<br /><br />
			<center><em>Who's record will you beat?</em></center>
		</Typography>
	);
}

export default ProfileInfo;
