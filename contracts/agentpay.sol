// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract AgentPay {
    address public owner;
    IERC20 public token;

    struct Subscription {
        address subscriber;
        uint256 amount;
        uint256 interval;
        uint256 nextPayment;
        address recipient;
        bool active;
    }

    mapping(address => Subscription) public subscriptions;

    event SubscriptionCreated(address indexed subscriber, address recipient, uint256 amount, uint256 interval);
    event PaymentProcessed(address indexed subscriber, address recipient, uint256 amount);
    event SubscriptionCanceled(address indexed subscriber);

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    function createSubscription(address _recipient, uint256 _amount, uint256 _interval) external {
        require(subscriptions[msg.sender].active == false, "Subscription already exists");
        
        subscriptions[msg.sender] = Subscription({
            subscriber: msg.sender,
            amount: _amount,
            interval: _interval,
            nextPayment: block.timestamp + _interval,
            recipient: _recipient,
            active: true
        });

        emit SubscriptionCreated(msg.sender, _recipient, _amount, _interval);
    }

    function processPayment(address _subscriber) external {
        Subscription storage sub = subscriptions[_subscriber];
        require(sub.active, "Subscription not active");
        require(block.timestamp >= sub.nextPayment, "Payment not due");

        sub.nextPayment = sub.nextPayment + sub.interval;
        token.transferFrom(sub.subscriber, sub.recipient, sub.amount);

        emit PaymentProcessed(sub.subscriber, sub.recipient, sub.amount);
    }

    function cancelSubscription() external {
        require(subscriptions[msg.sender].active, "No active subscription");
        subscriptions[msg.sender].active = false;

        emit SubscriptionCanceled(msg.sender);
    }
}
