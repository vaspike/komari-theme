import type { PingOverviewBucket } from "@/types/komari";
import { trimFixed } from "@/utils/format";

export function formatPingBucketWindow(bucket: PingOverviewBucket | null) {
  if (!bucket || bucket.startAt == null || bucket.endAt == null) {
    return null;
  }

  const start = new Date(bucket.startAt);
  const end = new Date(bucket.endAt);
  const startText = `${start.getHours().toString().padStart(2, "0")}:${start
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  const endText = `${end.getHours().toString().padStart(2, "0")}:${end
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return `${startText} - ${endText}`;
}

export function formatLatencyBucketSummary(bucket: PingOverviewBucket | null) {
  if (!bucket) return "—";
  if (bucket.value != null) return `${trimFixed(bucket.value, 1)} ms`;
  return bucket.total > 0 ? "失败" : "无样本";
}

export function formatReachabilityBucketSummary(
  bucket: PingOverviewBucket | null,
  separator = " ",
) {
  if (!bucket) return "—";
  if (bucket.total <= 0 || bucket.reachability == null) return "无样本";
  return `${trimFixed(bucket.reachability, 1)}%${separator}${bucket.total - bucket.lost}/${bucket.total} (可达)`;
}

/** @deprecated use formatReachabilityBucketSummary */
export const formatLossBucketSummary = formatReachabilityBucketSummary;

export function formatHealthBucketTooltip(
  bucket: PingOverviewBucket,
  kind: "latency" | "reachability",
) {
  const window = formatPingBucketWindow(bucket);
  const summary =
    kind === "latency"
      ? formatLatencyBucketSummary(bucket)
      : formatReachabilityBucketSummary(bucket, " · ");
  return window ? `${window} · ${summary}` : summary;
}
