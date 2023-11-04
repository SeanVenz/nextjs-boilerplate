"use client";

import React from "react";
import "./index.scss";
import { useTransactions } from "@/app/lib/useTransactions";
import {
  decodeMessage,
  decodeSignature,
  formatDate,
  formatMessage,
  parseString,
} from "@/app/lib/utils";
import { playFair } from "@/app/lib/fonts";
import ImagePreloader from "../Preloader";

function Cards({ wallet }: { wallet: string | null }) {
  const { transactions, error, isLoading } = useTransactions(wallet);

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <>
      {transactions.length > 0 && (
        <div className="transaction-parent">
          <h2>Available Businesses:</h2>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                <Card
                  imageUrl={formatMessage(decodeMessage(transaction)).imageUrl}
                  signature={decodeSignature(transaction.transaction.signature)}
                  date={formatDate(transaction.blockTime)}
                  businessType={formatMessage(decodeMessage(transaction)).businessType}
                  businessName={formatMessage(decodeMessage(transaction)).businessName}
                  businessDescription= {formatMessage(decodeMessage(transaction)).businessDescription}
                  businessOwner= {formatMessage(decodeMessage(transaction)).businessOwner}
                  location = {formatMessage(decodeMessage(transaction)).location}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Cards;

export function Card({
  imageUrl,
  signature,
  date,
  businessType,
  businessName,
  businessDescription,
  businessOwner,
  location
}: {
  imageUrl: any;
  signature: any;
  date: any;
  businessType: string;
  businessName: string;
  businessDescription: string;
  businessOwner: string;
  location: string;
}) {
  return (
    <div className="card">
      <ImagePreloader
        src={imageUrl}
        alt={businessName || "Business Default"}
        width={500}
        height={400}
      />
      <div className="card__content">
        <h4 className={`${playFair.className}`}>{businessName}</h4>
        <div className="descriptions">
          <p className="card__description">{date}</p>
          <p className="card__description">{businessType}</p>
          <p className="card__description">{businessDescription}</p>
          <p className="card__description">{businessOwner}</p>
          <p className="card__description">{location}</p>
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            className="card__description"
          >
            {parseString(signature, 12)}
          </a>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card-skeleton-container">
      {Array(7)
        .fill(null)
        .map((_, index) => (
          <div className="card-skeleton" key={index}>
            <div className="card-skeleton-header"></div>
            <div className="card-skeleton-content"></div>
            <div className="card-skeleton-header"></div>
          </div>
        ))}
    </div>
  );
}
