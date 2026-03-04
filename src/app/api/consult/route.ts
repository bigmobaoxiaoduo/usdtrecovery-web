import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// 收件人邮箱
const RECIPIENT_EMAIL = '807110848@qq.com';

// 发件人邮箱（需要用 Resend 验证过的域名）
const FROM_EMAIL = 'USDTRecovery <noreply@usdtrecovery.xyz>';

export async function POST(request: NextRequest) {
  try {
    // 运行时初始化 Resend（避免构建时需要 API key）
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    const body = await request.json();
    const {
      name,
      contactType,
      contactValue,
      stolenToken,
      stolenAmount,
      caseDescription,
      locale = 'zh'
    } = body;

    // 验证必填字段
    if (!contactValue || !stolenToken || !stolenAmount || !caseDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 构建邮件内容
    const contactTypeMap: Record<string, string> = {
      telegram: 'Telegram',
      wechat: '微信',
      email: '邮箱'
    };

    const subject = locale === 'en' 
      ? `[Consultation] New Inquiry from ${name || 'Anonymous'}`
      : `【咨询表单】新咨询 - ${name || '匿名用户'}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          ${locale === 'en' ? 'New Consultation Inquiry' : '新的咨询表单提交'}
        </h2>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 120px;">${locale === 'en' ? 'Name' : '姓名'}</td>
              <td style="padding: 10px 0; font-weight: 500;">${name || (locale === 'en' ? 'Not provided' : '未填写')}</td>
            </tr>
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">${locale === 'en' ? 'Contact' : '联系方式'}</td>
              <td style="padding: 10px 0; font-weight: 500;">${contactTypeMap[contactType] || contactType}: ${contactValue}</td>
            </tr>
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">${locale === 'en' ? 'Token' : '被盗币种'}</td>
              <td style="padding: 10px 0; font-weight: 500;">${stolenToken}</td>
            </tr>
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; color: #6b7280;">${locale === 'en' ? 'Amount' : '涉案金额'}</td>
              <td style="padding: 10px 0; font-weight: 500; color: #dc2626;">${stolenAmount}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">
            ${locale === 'en' ? 'Case Description' : '案件简述'}
          </h3>
          <p style="margin: 0; color: #78350f; line-height: 1.6; white-space: pre-wrap;">${caseDescription}</p>
        </div>

        <div style="color: #9ca3af; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p>${locale === 'en' ? 'Submitted at' : '提交时间'}: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</p>
          <p>${locale === 'en' ? 'Source' : '来源'}: USDTRecovery Website (${locale === 'en' ? 'English' : '中文'})</p>
        </div>
      </div>
    `;

    // 发送邮件
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
