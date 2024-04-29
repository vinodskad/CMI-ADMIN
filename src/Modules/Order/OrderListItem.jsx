import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { Alert, Card, Grid } from '@mui/material';
import { GetFormattedDate } from '../../app/HelperFunction';

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function OrderListItem({ordersList}) {
    console.log(ordersList)
  return (
      <Grid container sx={{ pl: 5, pt:5, pr:1}} spacing={2}>
        <Grid sm={12}>
      <Stepper orientation="vertical">
        {ordersList.map((step, index) => (
          <Step key={step.createdOn} expanded>
            <StepLabel>{GetFormattedDate(step.createdOn)}</StepLabel>
            {step.order.map(order => (<StepContent>
              <Typography>
                <div className='orderList'>
                    <div><b>{order.orderId}</b></div>
                    <div>{order.customerName}</div>
                    <div>{order.status}</div>
                </div>
            </Typography>
            </StepContent>))}
          </Step>
        ))}
      </Stepper>
      </Grid>
      </Grid>
  );
}
