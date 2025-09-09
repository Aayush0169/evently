import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { createUser, updateUser, deleteUser } from '@/lib/actions/user.action';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    // CREATE USER
    if (eventType === 'user.created') {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

      if (!email_addresses || email_addresses.length === 0) {
        return new Response('Error: User has no email address', { status: 400 });
      }

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username || '',
        firstName: first_name || '', 
        lastName: last_name || '',   
        photo: image_url,
      };

      const newUser = await createUser(user);

      if (newUser) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }
    }

    // UPDATE USER
    if (eventType === 'user.updated') {
      const { id, image_url, first_name, last_name, username } = evt.data;
      const user = {
        firstName: first_name || "",
        lastName: last_name || "",
        username: username || "",
        photo: image_url,
      };
      await updateUser(id, user);
    }

    // DELETE USER
    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      await deleteUser(id!);
    }

    return new Response('Webhook processed successfully', { status: 200 });

  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error: Could not verify webhook', { status: 400 });
  }
}