import { Router } from "express";
import "dotenv/config";
import pg from "pg";

const router = Router();

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
});
db.connect();

//Routes

//Creating a design system name
router.post("/design", async (req, res) => {
  const name = req.body.design_title;
  try {
    const checkDesignName = await db.query(
      "SELECT * FROM design_name WHERE design_title = $1",
      [name]
    );
    if (checkDesignName.rows.length > 0) {
      return res.status(200).json({
        status: "Error",
        message: "Design name already exists",
      });
    }

    const result = await db.query(
      "INSERT INTO design_name (design_title) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(200).json({
      status: "Success",
      data: {
        design: result.rows[0],
      },
    });
    console.log(result.rows);
  } catch (err) {
    console.log(err);
  }
});

//Getting a design system name for verification and more
router.get("/getdesign", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM design_name");
    res.status(200).json({
      status: "Success",
      data: {
        users: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Getting a specific design system name
router.get("/getdesign/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM design_name WHERE id = $1", [
      id,
    ]);

    //getting the group associated with the design
    const group = await db.query(
      "SELECT * FROM group_name WHERE design_id = $1",
      [id]
    );

    res.status(200).json({
      status: "Success",
      data: {
        user: result.rows[0],
        group: group.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Logging in a user whose design system already exist

router.post("/logindesign", async (req, res) => {
  const name = req.body.design_title
  try {
    const checkDesignName = await db.query(
      "SELECT * FROM design_name WHERE design_title = $1",
      [name]
    );
    if (checkDesignName.rows.length > 0) {
      return res.status(201).json({
        status: "Success",
        data: {
          result: checkDesignName.rows[0]
        }
      });
    }
  } catch (err) {
    console.log(err)
  }
})








//Group route setup//

//Storing our default group name

router.post("/:id/addgroup", async (req, res) => {
  const group_default = req.body.group_name;
  const deisgnName = req.params.id;

  try {
    const result = await db.query(
      "INSERT INTO group_name (group_name, design_id) VALUES ($1, $2) RETURNING *",
      [group_default, deisgnName]
    );
    console.log(result.rows[0])
    res.status(201).json({
      status: "Success",
      message: "Group Created",
      data: {
        group: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/group/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM group_name WHERE id = $1", [
      id,
    ]);

    //getting token assoiated with a certain group
    const token = await db.query(
      "SELECT * FROM token_list WHERE group_id = $1",
      [id]
    );

    res.status(200).json({
      status: "Success",
      data: {
        group: result.rows[0],
        token: token.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//updating the group name from the default name

router.patch("/group/:id", async (req, res) => {
  const id = req.params.id;
  const groupName = req.body.group_name;

  let updateName = [];
  let queryParams = [];
  let queryCounter = 1;

  if (groupName) {
    updateName.push(`group_name = $${queryCounter}`);
    queryParams.push(groupName);
    queryCounter++;
  }

  // If no fields to update, return a 400 Bad Request
  if (updateName.length === 0) {
    return res.status(400).json({
      status: "Fail",
      message: "No fields to update",
    });
  }

  queryParams.push(id); // Add the id as the last parameter
  const updateQuery = `UPDATE group_name SET ${updateName.join(
    ", "
  )} WHERE id = $${queryCounter} RETURNING *`;

  try {
    const result = await db.query(updateQuery, queryParams);
    res.status(200).json({
      status: "Success",
      data: {
        group: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: "Database query failed",
    });
  }
});


// Assuming deleteGroup is in the same file or imported from another module
const deleteGroup = async (groupId) => {
  try {
    // Step 1: Check if tokens exist for the group
    const tokenCount = await db.query('SELECT COUNT(*) FROM token_list WHERE group_id = $1', [groupId]);
    
    if (tokenCount.rows[0].count > 0) {
      // Step 2: Delete associated tokens first
      await db.query('DELETE FROM token_list WHERE group_id = $1', [groupId]);
    }

    // Step 3: Now delete the group
    await db.query('DELETE FROM group_name WHERE id = $1', [groupId]);

    console.log('Group and associated tokens deleted successfully.');
  } catch (err) {
    console.error('Error deleting group:', err);
    throw new Error('Could not delete the group');
  }
};

// Define the route
router.delete('/group/:groupId', async (req, res) => {
  const { groupId } = req.params;
  try {
    await deleteGroup(groupId);  // Call your function here
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the group' });
  }
});


//Token route setup

router.get("/token/:group_id", async (req, res) => {
  const id = req.params.group_id;

  try {
    const result = await db.query("SELECT * FROM token_list WHERE group_id = $1", [id])
    res.status(200).json({
      status: "Success",
      data: {
        token: result.rows
      }
    })

    console.log(result.rows)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: "Database query failed",
    });
  }
})

router.post("/token/:id", async (req, res) => {
  const tokenType = req.body.token_type
  const tokenName = req.body.token_name
  const tokenControl = req.body.token_control
  const group_id = req.params.id;

  try {
    const result = await db.query(
      "INSERT INTO token_list (token_type, token_name, token_control, group_id) VALUES ($1, $2, $3, $4) RETURNING * " ,
      [tokenType, tokenName, tokenControl, group_id]
    );
    res.status(201).json({
      status: "Success",
      message: "Token Created",
      data: {
        token: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: "Database query failed",
    });
  }
});

//updating the token entered into the database from the token page

router.patch("/token/:id", async (req, res) => {
  const { id } = req.params;
  const { token_type, token_name, token_control } = req.body;

  let updateFields = [];
  let queryParams = [];
  let queryCounter = 1;

  // Build the dynamic update query based on provided fields
  if (token_type) {
    updateFields.push(`token_type = $${queryCounter}`);
    queryParams.push(token_type);
    queryCounter++;
  }

  if (token_name) {
    updateFields.push(`token_name = $${queryCounter}`);
    queryParams.push(token_name);
    queryCounter++;
  }

  if (token_control) {
    updateFields.push(`token_control = $${queryCounter}`);
    queryParams.push(token_control);
    queryCounter++;
  }

  // If no fields to update, return a 400 Bad Request
  if (updateFields.length === 0) {
    return res.status(400).json({
      status: "Fail",
      message: "No fields to update",
    });
  }

  queryParams.push(id); // Add the id as the last parameter
  const updateQuery = `
    UPDATE token_list 
    SET ${updateFields.join(", ")} 
    WHERE id = $${queryCounter} 
    RETURNING *`;

  try {
    // Check if the token exists before updating
    const tokenExists = await db.query(`SELECT * FROM token_list WHERE id = $1`, [id]);
    if (tokenExists.rows.length === 0) {
      return res.status(404).json({
        status: "Fail",
        message: "Token not found",
      });
    }

    // Perform the update
    const result = await db.query(updateQuery, queryParams);

    res.status(200).json({
      status: "Success",
      message: "Token has been successfully updated",
      data: {
        token: result.rows[0],
      },
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      status: "Error",
      message: "Database query failed",
    });
  }
});


router.delete("/token/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("DELETE FROM token_list WHERE id = $1 RETURNING *", [
      id,
    ]);
    res.status(200).json({
      status: "Success",
      message: "You have successfully deleted this token",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: "Database query failed",
    });
  }
});

//Implementing converting token to different formats

// Function to get tokens from PostgreSQL
const getTokensFromDatabase = async () => {
  try {
    const res = await db.query("SELECT * FROM token_list WHERE group_id");
    const tokens = {};
    res.rows.forEach((row) => {
      tokens[row.token_name] = row.token_control;
    });
    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

// Conversion functions
const tokensToCSS = (tokens) => {
  return Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\n");
};

const tokensToSCSS = (tokens) => {
  return Object.entries(tokens)
    .map(([key, value]) => `$${key}: ${value};`)
    .join("\n");
};

const tokensToTailwind = (tokens) => {
  return JSON.stringify(
    {
      theme: {
        fontSize: tokens.fontSize,
        colors: {
          primary: tokens.colorPrimary,
        },
        spacing: {
          small: tokens.spacingSmall,
        },
      },
    },
    null,
    2
  );
};

const tokensToJSON = (tokens) => {
  return JSON.stringify(tokens, null, 2);
};

// API endpoint to export tokens
router.get("/export-tokens", async (req, res) => {
  const { format } = req.query;

  try {
    const tokens = await getTokensFromDatabase(); // Fetch tokens from PostgreSQL

    let content;
    if (format === "css") content = tokensToCSS(tokens);
    else if (format === "scss") content = tokensToSCSS(tokens);
    else if (format === "tailwind") content = tokensToTailwind(tokens);
    else if (format === "json") content = tokensToJSON(tokens);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="tokens.${format}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(content);
  } catch (error) {
    console.error("Error exporting tokens:", error);
    res.status(500).send("Error exporting tokens");
  }
});

export default router;
