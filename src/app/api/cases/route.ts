import { NextResponse } from 'next/server';
import { initialCases, calculateStats } from '@/components/case-tracking/caseData';

export async function GET() {
  try {
    const cases = initialCases;
    const stats = calculateStats(cases);
    
    return NextResponse.json({
      success: true,
      data: {
        cases,
        stats,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取案件数据失败' },
      { status: 500 }
    );
  }
}
