import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "精品手表展示 - 商务大厦1A",
  description: "商务大厦1A精品手表专营店，提供经典、运动、奢华系列手表，专业销售咨询和维修服务。",
};

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}