'use client';

import { Heart } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CATEGORY_CHART_COLORS,
  type CategoryStat,
} from '@/features/mypage/lib/calculate-category-stats';
import { cn } from '@/lib/utils';

interface CategoryStatsSectionProps {
  totalCount: number;
  categoryStats: CategoryStat[];
  className?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: CategoryStat;
  }>;
}

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-bg px-3 py-2 shadow-md">
      <p className="text-sm font-medium text-text">{data.label}</p>
      <p className="text-sm text-textMuted">{data.count}개</p>
    </div>
  );
}

export function CategoryStatsSection({
  totalCount,
  categoryStats,
  className,
}: CategoryStatsSectionProps) {
  const chartData = categoryStats.filter((stat) => stat.count > 0);

  return (
    <section className={cn(className)}>
      <header className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text">
          북마크 통계
        </h2>
        <p className="mt-1 text-sm text-textMuted">
          저장한 취미의 카테고리별 분포를 확인하세요.
        </p>
      </header>

      <Card className="rounded-2xl border-border shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-text">
                카테고리별 분포
              </CardTitle>
              <p className="text-sm text-textMuted">총 {totalCount}개</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          {totalCount === 0 ? (
            <div className="flex h-[240px] items-center justify-center rounded-xl bg-bgMuted">
              <p className="text-sm text-textMuted">
                북마크한 취미가 없어 통계를 표시할 수 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      innerRadius={64}
                      outerRadius={104}
                      paddingAngle={2}
                    >
                      {chartData.map((stat) => (
                        <Cell
                          key={stat.category}
                          fill={CATEGORY_CHART_COLORS[stat.category]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <ul className="space-y-3">
                {categoryStats.map((stat) => {
                  const percentage =
                    totalCount > 0
                      ? Math.round((stat.count / totalCount) * 100)
                      : 0;

                  return (
                    <li
                      key={stat.category}
                      className="flex items-center justify-between rounded-xl bg-bgMuted px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor: CATEGORY_CHART_COLORS[stat.category],
                          }}
                          aria-hidden
                        />
                        <span className="text-sm font-medium text-text">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-text">
                          {stat.count}개
                        </p>
                        <p className="text-xs text-textMuted">{percentage}%</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
