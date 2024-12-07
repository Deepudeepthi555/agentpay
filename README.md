# AgentPay Subscription Manager

A subscription management platform that allows users to track their active subscriptions and pay for them using AgentPay via Coinbase's AgentKit. Users can see a list of platforms (e.g., Netflix, YouTube, Spotify) they're subscribed to and make payments using crypto, simplifying subscription payments.

## Features
- **Dashboard**: View all active subscriptions in one place.
- **Subscription List**: See detailed information about each subscription (platform, plan, next payment date, etc.).
- **Payment Interface**: Make payments using AgentPay for each subscription.
- **Payment History**: Track payments and manage subscriptions easily.

## Working flow
- User uses Pay Using AgentPay button in some website, which contains metadata about the payee
- This triggers approval transaction for the subscription amount of SubTokens
- Smart contract now executes first tranasaction and emits event subscription added.
- Backend Agent listens for events on this contract, and adds the new subscription to its cron job.
- Now based on intervals, backend agent will execute the payment transaction on the smart contract which has approval to spend the SubTokens.

![image](https://github.com/user-attachments/assets/51a5a84d-5980-4230-9609-a01eedbbf79c)
