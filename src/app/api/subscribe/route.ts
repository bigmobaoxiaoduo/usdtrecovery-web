import { NextResponse } from 'next/server';

// In-memory store for development - use database in production
const subscribers = new Set<string>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: '邮箱格式不正确' },
        { status: 400 }
      );
    }
    
    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: '该邮箱已订阅' },
        { status: 409 }
      );
    }
    
    // Add to subscribers
    subscribers.add(email.toLowerCase());
    
    // TODO: Send welcome email via Resend when API key is configured
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({...});
    // }
    
    return NextResponse.json({
      success: true,
      message: '订阅成功',
      subscriberCount: subscribers.size,
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { success: false, error: '订阅失败，请稍后重试' },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
