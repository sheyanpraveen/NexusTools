"use client";

import { ToolItem } from "@/types/tool";
import { PercentageCalculator } from "./PercentageCalculator";
import { PercentageIncreaseCalculator } from "./PercentageIncreaseCalculator";
import { PercentageDecreaseCalculator } from "./PercentageDecreaseCalculator";
import { DiscountCalculator } from "./DiscountCalculator";
import { AverageCalculator } from "./AverageCalculator";
import { RatioCalculator } from "./RatioCalculator";
import { SimpleInterestCalculator } from "./SimpleInterestCalculator";
import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { LoanCalculator } from "./LoanCalculator";
import { LengthConverter } from "./LengthConverter";
import { WeightConverter } from "./WeightConverter";
import { TemperatureConverter } from "./TemperatureConverter";
import { DataStorageConverter } from "./DataStorageConverter";
import { AgeCalculator } from "./AgeCalculator";
import { DateDifferenceCalculator } from "./DateDifferenceCalculator";
import { DaysBetweenDatesCalculator } from "./DaysBetweenDatesCalculator";
import { UnixTimestampConverter } from "./UnixTimestampConverter";
import { TimezoneConverter } from "./TimezoneConverter";
import { IpAddressChecker } from "./IpAddressChecker";
import { SubnetCalculator } from "./SubnetCalculator";
import { CidrCalculator } from "./CidrCalculator";
import { JsonFormatter } from "./JsonFormatter";
import { Base64EncoderDecoder } from "./Base64EncoderDecoder";
import { UrlEncoderDecoder } from "./UrlEncoderDecoder";
import { UuidGenerator } from "./UuidGenerator";
import { PasswordGenerator } from "./PasswordGenerator";
import { HashGenerator } from "./HashGenerator";
import { WordCounter } from "./WordCounter";
import { CharacterCounter } from "./CharacterCounter";
import { CaseConverter } from "./CaseConverter";
import { TextDiffCompare } from "./TextDiffCompare";
import { SlugGenerator } from "./SlugGenerator";
import { PomodoroTimer } from "./PomodoroTimer";
import { QrCodeGenerator } from "./QrCodeGenerator";

export function ToolRenderer({ tool }: { tool: ToolItem }) {
  switch (tool.slug) {
    // Calculators
    case "percentage-calculator":
      return <PercentageCalculator />;
    case "percentage-increase-calculator":
      return <PercentageIncreaseCalculator />;
    case "percentage-decrease-calculator":
      return <PercentageDecreaseCalculator />;
    case "discount-calculator":
      return <DiscountCalculator />;
    case "average-calculator":
      return <AverageCalculator />;
    case "ratio-calculator":
      return <RatioCalculator />;

    // Finance
    case "simple-interest-calculator":
      return <SimpleInterestCalculator />;
    case "compound-interest-calculator":
      return <CompoundInterestCalculator />;
    case "loan-calculator":
      return <LoanCalculator />;

    // Converters
    case "length-converter":
      return <LengthConverter />;
    case "weight-converter":
      return <WeightConverter />;
    case "temperature-converter":
      return <TemperatureConverter />;
    case "data-storage-converter":
      return <DataStorageConverter />;

    // Date & Time
    case "age-calculator":
      return <AgeCalculator />;
    case "date-difference-calculator":
      return <DateDifferenceCalculator />;
    case "days-between-dates":
      return <DaysBetweenDatesCalculator />;
    case "unix-timestamp-converter":
      return <UnixTimestampConverter />;
    case "timezone-converter":
      return <TimezoneConverter />;

    // Technology
    case "ip-address-checker":
      return <IpAddressChecker />;
    case "subnet-calculator":
      return <SubnetCalculator />;
    case "cidr-calculator":
      return <CidrCalculator />;
    case "json-formatter":
    case "json-validator":
      return <JsonFormatter />;
    case "base64-encoder-decoder":
      return <Base64EncoderDecoder />;
    case "url-encoder-decoder":
      return <UrlEncoderDecoder />;
    case "uuid-generator":
      return <UuidGenerator />;
    case "password-generator":
      return <PasswordGenerator />;
    case "hash-generator":
      return <HashGenerator />;

    // Text Tools
    case "word-counter":
      return <WordCounter />;
    case "character-counter":
      return <CharacterCounter />;
    case "case-converter":
      return <CaseConverter />;
    case "text-diff-compare":
      return <TextDiffCompare />;
    case "slug-generator":
      return <SlugGenerator />;

    // Productivity
    case "pomodoro-timer":
      return <PomodoroTimer />;
    case "qr-code-generator":
      return <QrCodeGenerator />;

    default:
      return <PercentageCalculator />;
  }
}
